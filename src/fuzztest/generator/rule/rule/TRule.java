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

import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.generator.rule._common.VNodeProcessor;
import fuzztest.generator.rule.named.TNamed;
import fuzztest.model.abstracts.TClass;

/**
 * rules = expression
 * 
 * Corresponding PEGjs rule:
 * 
 * <pre>
* Rule
 *   = name:IdentifierName __ displayName:(StringLiteral __)? "=" __ expression:Expression EOS
 *     {
 *         var _ex;
 *         
 *         if (displayName !== null)
 *         {
 *             _ex = 
 *             {
 *                 type:           "named",
 *                 name:           displayName[0],
 *                 expression:     expression,
 *                 location:       location ()
 *             };
 *         }
 *         else
 *         {
 *             _ex = expression;
 *         }
 *         
 *         return 
 *         {
 *             type:               "rule",
 *             name:               name,
 *             expression:         _ex,
 *             location:           location ()
 *         };
 *     }
 * </pre>
 * 
 * @author peter
 * @see    {@link TNamed}
 */
public class TRule extends VNodeProcessor
{
    /**
     * The {@link TClass} of this class for type information. 
     */
    public  static final TClass gkClass = (new TRule (TAttributeSet.GetNullSet ())).GetClass ();

    public TRule (TAttributeSet attributes)
    {
        super (attributes);
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#CreateData(fuzztest.generator.rule.VNode.EStrategy)
     */
    @Override
    protected String _CreateData (String head)
    {
        TAttributeSet   as;
        boolean         doFollow;
        TRule           ref;
        VNode           expr;
        String          ret;
        
        as          = _GetAttributes ();
        doFollow    = VNode.DoesFollowRule (as);
        if (doFollow)
        {
            ref = this;
        }
        else
        {
            ref = (TRule) _GetFromOppositeSet ();
        }
        
        expr        = ref._GetExpression ();
        ret         = expr.CreateData (head);
        
        return ret;
    }
}
