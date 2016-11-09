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
public class TRule extends VNode
{
    /**
     * The {@link TClass} of this class for type information. 
     */
    public  static final TClass gClass = (new TRule (null)).GetClass ();

    public TRule (String key)
    {
        super (key);
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#CreateData(fuzztest.generator.rule.VNode.EStrategy)
     */
    @Override
    protected String _CreateData (TStrategy s, String head)
    {
        boolean     doFollow;
        TRule       ref;
        VNode       expr;
        String      ret;
        
        doFollow    = VNode.DoesFollowRule (s);
        if (doFollow)
        {
            ref = this;
        }
        else
        {
            ref = (TRule) _GetFromOppositeSet ();
        }
        
        expr        = ref._GetExpression ();
        ret         = expr.CreateData (s, head);
        
        return ret;
    }
}
