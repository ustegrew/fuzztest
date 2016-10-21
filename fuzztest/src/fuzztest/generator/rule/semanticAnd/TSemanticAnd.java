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

package fuzztest.generator.rule.semanticAnd;

import fuzztest.generator.rule.VNode;

/**
 * 
 * 
 * Corresponding PEGjs rule:
 * 
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
public class TSemanticAnd extends VNode
{

}
