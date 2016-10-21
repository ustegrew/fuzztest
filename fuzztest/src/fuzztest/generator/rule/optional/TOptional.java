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

package fuzztest.generator.rule.optional;

import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;
import fuzztest.generator.rule.zeroOrMore.TZeroOrMore;
import fuzztest.utils.gen.TGenData;

/**
 * 
 * 
 * Corresponding PEGjs rule:
 * 
 * <pre>
 * SuffixedExpression
 *     = expression:PrimaryExpression __ operator:SuffixedOperator 
 *     {
 *         var OPS_TO_SUFFIXED_TYPES = 
 *         {
 *             "?": "optional",
 *             "*": "zero_or_more",
 *             "+": "one_or_more"
 *         };
 * 
 *         return 
 *         {
 *             type:               OPS_TO_SUFFIXED_TYPES[operator],
 *             expression:         expression,
 *             location:           location ()
 *         };
 *     }
 *     / PrimaryExpression
 * </pre>
 * 
 * @author peter
 * @see    {@link TZeroOrMore}, {@link TOneOrMore}
 *
 */
public class TOptional extends VNode
{
    private VNode               fExpression;
    
    public TOptional ()
    {
        super ();
        fExpression = null;
    }
    
    public void SetExpression (VNode exprN)
    {
        if (fExpression != null)
        {
            throw new IllegalArgumentException 
            (
                "Expression already set: Node set: '" + fExpression.GetKey () + 
                "'. Tried to replace with: '" + exprN.GetKey () + "'"
            );
        }
    }

    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (TStrategy s, String head)
    {
        boolean doExpression;
        String  ret;
        
        doExpression = TGenData.GetBoolean ();
        if (doExpression)
        {
            ret = fExpression.CreateData (s, head);
        }
        else
        {
            ret = head;
        }
        
        return ret;
    }
}
