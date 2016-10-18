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

package fuzztest.generator.rule.rule;

import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;

/**
 * rules = expression
 * 
 * @author peter
 */
public class TRule extends VNode
{
    private VNode               fExpression;
    
    public TRule (String key)
    {
        super (key);
        fExpression = null;
    }
    
    public void SetExpression (VNode exprN)
    {
        if (fExpression != null)
        {
            throw new IllegalArgumentException ("Expression already set: Node set: '" + fExpression.GetKey () + "'. Tried to replace with: '" + exprN.GetKey () + "'");
        }

        fExpression = exprN;
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#CreateData(fuzztest.generator.rule.VNode.EStrategy)
     */
    @Override
    protected String _CreateData (TStrategy s, String head)
    {
        TRule       ref;
        VNode       expr;
        String      ret;
        
        ref     = (TRule) _GetFromOppositeSet (s);
        expr    = ref.fExpression;
        ret     = expr.CreateData (s, head);
        
        return ret;
    }
}
