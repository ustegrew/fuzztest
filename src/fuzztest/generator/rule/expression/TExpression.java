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

package fuzztest.generator.rule.expression;

import fuzztest.generator.rule.VNode;
import fuzztest.model.abstracts.TClass;

/**
 * Corresponding PEGjs rule:
 * <pre>
 * Expression
 *     = ChoiceExpression
 * </pre>
 * @author peter
 */
public class TExpression extends VNode
{
    /**
     * The {@link TClass} of this class for type information. 
     */
    public  static final TClass gClass = (new TExpression ()).GetClass ();
}
