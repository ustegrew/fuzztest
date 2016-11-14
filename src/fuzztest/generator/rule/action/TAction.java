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

package fuzztest.generator.rule.action;

import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNodePassthrough;
import fuzztest.model.abstracts.TClass;

/**
 * <pre>
 * ActionExpression
 *    = expression:SequenceExpression code:(__ CodeBlock)?
 *    {
 *        var ret;
 *        
 *        if (code !== null)
 *        {
 *            ret = 
 *            {
 *                type:           "action",
 *                expression:     expression,
 *                code:           code[1],
 *                location:       location ()
 *            };
 *        }
 *        else
 *        {
 *            ret = expression;
 *        }
 *        
 *        return ret;
 *    }
 * </pre>
 * @author peter
 *
 */
public class TAction extends VNodePassthrough
{
    /**
     * The {@link TClass} of this class for type information. 
     */
    public static final TClass gkClass = (new TAction (TAttributeSet.GetNullSet ())).GetClass ();

    /**
     * @param key
     * @param s
     */
    protected TAction (TAttributeSet attributes)
    {
        super (attributes);
    }
}
