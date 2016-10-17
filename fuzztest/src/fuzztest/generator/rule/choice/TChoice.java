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

package fuzztest.generator.rule.choice;

import java.util.ArrayList;

import fuzztest.generator.TRepository;
import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;
import fuzztest.utils.gen.TGenData;

/**
 * @author peter
 *
 */
public class TChoice extends VNode
{
    private ArrayList<VNode>        fBranches;
    
    /**
     * 
     */
    public TChoice ()
    {
        fBranches = new ArrayList<> ();
        _SetKey ();
        TRepository.Add (this);
    }
    
    public void AddNode (VNode node)
    {
        fBranches.add (node);
    }

    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (TStrategy s, String head)
    {
        int     i;
        int     n;
        VNode   node;
        String  ret;
        
        n = fBranches.size ();
        if (n >= 1)
        {
            i       = TGenData.GetInt (n);
            node    = fBranches.get (i);
            ret     = node.CreateData (s, head); 
        }
        else
        {
            ret = head;
        }
        
        return ret;
    }
}

/*
[100]   We will ignore the ERuleAdhesion.kInjectInvalids directive - it will be honored by relevant sub nodes. 
*/