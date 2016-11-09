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

import fuzztest.generator.rule.VNode;
import fuzztest.generator.rule.prefixed.simple_and.TSimpleAnd;
import fuzztest.generator.rule.prefixed.simple_not.TSimpleNot;
import fuzztest.generator.rule.prefixed.text.TText;
import fuzztest.model.abstracts.TClass;
import fuzztest.utils.storage.TOnceAssignable;

/**
 * label: expression
 * 
 * Corresponding PEGjs rule:
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
public class TLabelled extends VNode
{
    private TOnceAssignable<String> fLabel;
    
    public static TClass GetClass_Static ()
    {
        TClass      ret;
        
        ret = (new TLabelled ()).GetClass_Object ();
        
        return ret;
    }

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
