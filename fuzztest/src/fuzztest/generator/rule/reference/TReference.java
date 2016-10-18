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
import fuzztest.generator.rule.VNode;
import fuzztest.generator.rule.rule.TRule;

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
        super ();
        fReferred = referred;
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#CreateData(fuzztest.generator.rule.VNode.EStrategy)
     */
    protected String _CreateData (TStrategy s, String head)
    {
        TRule                   ref;
        String                  ret;
        
        ref = (TRule) TRepository.Get (fReferred);
        ret = ref.CreateData (s, head);                         /* [100] */
        
        return ret;
    }
}

/*  
[100]   We defer getting the actual node (this node or another node of this class) to inside the CreateData method.
 */
