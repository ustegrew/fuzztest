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

package fuzztest.generator.rule.labelled;

import fuzztest.generator.primitive.TOnceAssignable;
import fuzztest.generator.rule.VNodeFallthrough;
import fuzztest.generator.rule.simpleAnd.TSimpleAnd;
import fuzztest.generator.rule.simpleNot.TSimpleNot;
import fuzztest.generator.rule.text.TText;

/**
 * label: expression
 * 
 * Corresponding PEGjs rule:
 * 
 * <pre>
 * LabeledExpression
 *     = label:Identifier __ ":" __ expression:PrefixedExpression 
 *     {
 *         return 
 *         {
 *             type:               "labeled",
 *             label:              label,
 *             expression:         expression,
 *             location:           location ()
 *         };
 *     }
 *     / PrefixedExpression
 * </pre>
 * 
 * @author peter
 * @see    {@link TText}, {@link TSimpleAnd}, {@link TSimpleNot}
 */
public class TLabelled extends VNodeFallthrough
{
    private TOnceAssignable<String> fLabel;
    
    public TLabelled ()
    {
        super ();
        fLabel          = new TOnceAssignable<> ();
    }
    
    public String GetLabel ()
    {
        String ret;
        
        ret = fLabel.Get ();
        
        return ret;
    }
    
    public void SetLabel (String label)
    {
        fLabel.Set (label);
    }
}
