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

package fuzztest.generator.rule.prefixed.simple_not;

import fuzztest.generator.rule.VNode;
import fuzztest.generator.rule.prefixed.text.TText;
import fuzztest.generator.rule.semanticPredicate.semantic_and.TSemanticAnd;
import fuzztest.model.abstracts.TClass;

/**
 * 
 * 
 * Corresponding PEGjs rule:
 * 
 * <pre>
 * PrefixedExpression
 *     = operator:PrefixedOperator __ expression:SuffixedExpression 
 *     {
 *         var OPS_TO_PREFIXED_TYPES = 
 *         {
 *             "$": "text",
 *             "&": "simple_and",
 *             "!": "simple_not"
 *         };
 *         
 *         return 
 *         {
 *             type:               OPS_TO_PREFIXED_TYPES[operator],
 *             expression:         expression,
 *             location:           location ()
 *         };
 *     }
 *     / SuffixedExpression
 * </pre>
 * 
 * @author peter
 * @see    {@link TSemanticAnd}, {@link TText}
 */
public class TSimpleNot extends VNode
{
    public static TClass GetClass_Static ()
    {
        TClass      ret;
        
        ret = (new TSimpleNot ()).GetClass_Object ();
        
        return ret;
    }
}
