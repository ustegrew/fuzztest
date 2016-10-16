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

import fuzztest.generator.TRepository;
import fuzztest.generator.rule.VNode;

/**
 * rules = expression
 * 
 * @author peter
 */
public class TRule extends VNode
{
    private VNode               fExpression;
    
    public TRule (String key)
    {
        SetKey (key);
        TRepository.Add (this);
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#CreateData(fuzztest.generator.rule.VNode.EStrategy)
     */
    @Override
    public String CreateData (EStrategy s)
    {
        // TODO Auto-generated method stub
        return null;
    }
}
