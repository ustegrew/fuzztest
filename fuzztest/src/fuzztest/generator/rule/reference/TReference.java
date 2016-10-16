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

package fuzztest.generator.rule.reference;

import fuzztest.generator.TRepository;
import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.TStrategy.ERuleAdhesion;
import fuzztest.generator.rule.VNode;

/**
 * rule
 * 
 * @author peter
 */
public class TReference extends VNode
{
    private String          fReferred;
    
    /**
     * 
     */
    public TReference (String referred)
    {
        fReferred = referred;
        _SetKey ();
        TRepository.Add (this);
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#CreateData(fuzztest.generator.rule.VNode.EStrategy)
     */
    protected String _CreateData (TStrategy s, String head)
    {
        ERuleAdhesion           ra;
        VNode                   ref;
        String                  ret;
        
        ra = s.GetRuleAdhesion ();
        if (ra == ERuleAdhesion.kFollowRule)
        {
            ref = (VNode) TRepository.Get (fReferred);
        }
        else
        {
            ref = (VNode) _GetFromOppositeSet ();
        }
        
        ret = ref.CreateData (s, head);
        
        return ret;
    }
}
