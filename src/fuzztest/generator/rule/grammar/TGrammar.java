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

package fuzztest.generator.rule.grammar;

import fuzztest.generator.TRepository;
import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;
import fuzztest.generator.rule.rule.TRule;

/**
 * Generator rule for: Whole grammar. 
 *
 * Corresponding PEGjs rule:
 * <pre>
 * Grammar
 *     = __ initializer:(Initializer __)? rules:(Rule __)+ 
 *     {
 *         var _init;
 *         var _i;
 *         var _extractedRules;
 *         
 *         if (initializer)
 *         {
 *             _init = initializer [0];
 *         }
 *         else
 *         {
 *             _init = null;
 *         }
 *         
 *         _extractedRules = new Array (rules.length);
 *         for (_i = 0; _i < rules.length; _i++)
 *         {
 *             _extractedRules[_i] = rules[_i][0];
 *         }
 *         
 *         return 
 *         {
 *             type:               "grammar",
 *             initializer:        _init,
 *             rules:              _extractedRules,
 *             location:           location ()
 *         };
 *     }
 * </pre>
 * 
 * @author peter
 */
public class TGrammar extends VNode
{
    private static final String         kKeyStart   = "start";
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (TStrategy s, String head)
    {
        TRule           rStart;
        String          ret;
        
        rStart  = (TRule) TRepository.Get (kKeyStart);
        ret     = rStart.CreateData (s, head);
        
        return ret;
    }
}
