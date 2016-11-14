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

package fuzztest.generator.rule.semanticPredicate.semantic_and;

import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNodePassthrough;
import fuzztest.generator.rule.semanticPredicate.semantic_not.TSemanticNot;
import fuzztest.model.abstracts.TClass;

/**
 * Semantic AND. 
 * <code>& { predicate }</code>. 
 * 
 * From the PEGjs documentation:<br/>
 * <i>The predicate is a piece of JavaScript code that 
 * is executed as if it was inside a function. [...]
 * It should return some JavaScript value using the 
 * <code>return</code> statement. If the returned value 
 * evaluates to <code>true</code> in boolean context, 
 * just return <code>undefined</code> and do not advance 
 * the parser position; otherwise consider the match failed.</i>
 * 
 * Corresponding PEGjs rule:
 * <pre>
 * SemanticPredicateExpression
 *     = operator:SemanticPredicateOperator __ code:CodeBlock 
 *     {
 *         var OPS_TO_SEMANTIC_PREDICATE_TYPES = 
 *         {
 *             "&": "semantic_and",
 *             "!": "semantic_not"
 *         };
 * 
 *         return 
 *         {
 *             type:               OPS_TO_SEMANTIC_PREDICATE_TYPES[operator],
 *             code:               code,
 *             location:           location ()
 *         };
 *     }
 * </pre>
 * 
 * @author peter
 * @see    {@link TSemanticNot}
 */
public class TSemanticAnd extends VNodePassthrough
{
    /**
     * The {@link TClass} of this class for type information. 
     */
    public  static final TClass gkClass = (new TSemanticAnd (TAttributeSet.GetNullSet ())).GetClass ();

    /**
     * @param s
     */
    protected TSemanticAnd (TAttributeSet attributes)
    {
        super (attributes);
    }
}
