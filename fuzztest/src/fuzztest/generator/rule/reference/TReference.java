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

import fuzztest.generator.rule.VNodeFallthrough;

/**
 * rule reference. 
 * 
 * A plain fallthrough node. Note:
 * In case the strategy is to inject invalids, we will defer
 * same class node swap to the CreateData method of the 
 * next active VNode down the callchain.  
 * 
 * Corresponding PEGjs rule:
 * 
 * <pre>
 * RuleReferenceExpression
 *     = name:IdentifierName !(__ (StringLiteral __)? "=") 
 *     {
 *         return 
 *         {
 *             type:               "rule_ref", 
 *             name:               name, 
 *             location:           location ()
 *         };
 *     }
 * </pre>
 * 
 * @author peter
 */
public class TReference extends VNodeFallthrough
{
}















