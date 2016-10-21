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

package fuzztest.generator.rule.named;

import fuzztest.generator.primitive.TOnceAssignable;
import fuzztest.generator.rule.VNodeFallthrough;
import fuzztest.generator.rule.rule.TRule;

/**
 * 
 * 
 * Corresponding PEGjs rule:
 * 
 * <pre>
 * Rule
 *   = name:IdentifierName __ displayName:(StringLiteral __)? "=" __ expression:Expression EOS
 *     {
 *         var _ex;
 *         
 *         if (displayName !== null)
 *         {
 *             _ex = 
 *             {
 *                 type:           "named",
 *                 name:           displayName[0],
 *                 expression:     expression,
 *                 location:       location ()
 *             };
 *         }
 *         else
 *         {
 *             _ex = expression;
 *         }
 *         
 *         return 
 *         {
 *             type:               "rule",
 *             name:               name,
 *             expression:         _ex,
 *             location:           location ()
 *         };
 *     }
 * </pre>
 * 
 * @author peter
 * @see    {@link TRule}
 */
public class TNamed extends VNodeFallthrough
{
    private TOnceAssignable<String> fName;
    
    public TNamed ()
    {
        super ();
        fName          = new TOnceAssignable<> ();
    }
    
    public String GetLabel ()
    {
        String ret;
        
        ret = fName.Get ();
        
        return ret;
    }
    
    public void SetLabel (String label)
    {
        fName.Set (label);
    }
}
