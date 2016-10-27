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

package fuzztest.generator.rule.group;

import fuzztest.generator.rule.VNode;

/**
 * Corresponding PEGjs rule:
 * <pre>
 * PrimaryExpression
 *     = LiteralMatcher
 *     / CharacterClassMatcher
 *     / AnyMatcher
 *     / RuleReferenceExpression
 *     / SemanticPredicateExpression
 *     / "(" __ expression:Expression __ ")" 
 *     {
 *         var ret;
 *         
 *         /
 *         * The purpose of the "group" AST node is just to isolate label scope. We
 *         * don't need to put it around nodes that can't contain any labels or
 *         * nodes that already isolate label scope themselves. This leaves us with
 *         * "labeled" and "sequence".
 *         /
 *         if (expression.type === 'labeled' || expression.type === 'sequence')
 *         {
 *             ret = 
 *             {
 *                 type:           "group", 
 *                 expression:     expression
 *             };
 *         }
 *         else
 *         {
 *             ret = expression;
 *         }
 *         
 *         return ret;
 *     }
 * </pre>
 * 
 * @author peter
 */
public class TGroup extends VNode
{
}
