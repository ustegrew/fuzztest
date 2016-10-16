/* -----------------------------------------------------------------------------
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
----------------------------------------------------------------------------- */

package fuzztest.generator.rule.characterClass;

import java.util.ArrayList;

import fuzztest.generator.TRepository;
import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;
import fuzztest.generator.rule.TStrategy.ERuleAdhesion;

/**
 * A single character generator. Creates characters that (don't) match a given character class.
 * The character class can have multiple character ranges or character points, such as
 * <code>[0-9]</code> or <code>[a-z][0-9]_</code>.
 * 
 * @author peter
 */
public class TCharacterClass extends VNode
{
    private ArrayList<VCharSet>     fSets;
    
    /**
     * cTor. 
     */
    public TCharacterClass ()
    {
        fSets = new ArrayList<> ();
        _SetKey ();
        TRepository.Add (this);
    }
    
    public void AddPoint (String ch)
    {
        TCharacterPoint         set;
        
        set = new TCharacterPoint (ch);
        fSets.add (set);
    }
    
    /**
     * @param string
     * @param string2
     */
    public void AddRange (String loChar, String hiChar, boolean isInverse)
    {
        TCharacterRange         set;
        
        set = new TCharacterRange (loChar, hiChar, isInverse);
        fSets.add (set);
    }
    
    protected String _CreateData (TStrategy s, String head)
    {
        ERuleAdhesion       ra;
        boolean             mustBeInSet;
        String              ret;
        
        ra              = s.GetRuleAdhesion ();
        mustBeInSet     = (ra == ERuleAdhesion.kFollowRule);
        ret             = head + _CreateChar (mustBeInSet);
        
        return ret;
    }

    private String _CreateChar (boolean mustBeInSet)
    {
        char    c;
        boolean isMatch;
        boolean doLoop;
        String  ret;
        
        doLoop = true;
        do
        {
            c           = (char) (0x10000 * Math.random ());
            ret         = "" + c;
            isMatch     = _IsInSet (ret);
            if (mustBeInSet)
            {
                doLoop = !isMatch;
            }
            else
            {
                doLoop = isMatch;
            }
        } while (doLoop);
        
        return ret;
    }
    
    private boolean _IsInSet (String ch)
    {
        int             i;
        int             n;
        VCharSet        set;
        boolean         isMatch;
        
        isMatch = false;
        n       = fSets.size ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                set     = fSets.get (i);
                isMatch = isMatch  ||  set.IsMatch (ch);
            }
        }
        
        return isMatch;
    }
}
