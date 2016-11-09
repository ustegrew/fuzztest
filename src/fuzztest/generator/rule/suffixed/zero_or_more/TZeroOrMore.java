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

package fuzztest.generator.rule.suffixed.zero_or_more;

import fuzztest.generator.rule.VNode;
import fuzztest.generator.rule.suffixed.VSuffixed;
import fuzztest.generator.rule.suffixed.optional.TOptional;
import fuzztest.model.abstracts.TClass;

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
 * @see    {@link TOptional}, {@link TOneOrMore}
 */
public class TZeroOrMore extends VSuffixed
{
    public static TClass GetClass_Static ()
    {
        TClass      ret;
        
        ret = (new TZeroOrMore ()).GetClass_Object ();
        
        return ret;
    }

    public TZeroOrMore ()
    {
        super (true, true);
    }
}
