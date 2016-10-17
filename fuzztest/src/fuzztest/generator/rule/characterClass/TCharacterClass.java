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
import fuzztest.utils.gen.TGenData;

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
    public void AddRange (String loChar, String hiChar)
    {
        TCharacterRange         set;
        
        set = new TCharacterRange (loChar, hiChar);
        fSets.add (set);
    }
    
    protected String _CreateData (TStrategy s, String head)
    {
        int         n;
        VCharSet    cs;
        int         x;
        String      ret;

        n   = fSets.size ();
        if (n >= 1)
        {
            x       = TGenData.GetInt (n);
            cs      = fSets.get (x);
            ret     = head + cs.GetChar (s);
        }
        else
        {
            ret     = head;
        }
        
        return ret;
    }
}
