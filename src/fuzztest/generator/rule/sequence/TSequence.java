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

package fuzztest.generator.rule.sequence;

import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.generator.rule._common.VNodeProcessor;
import fuzztest.model.abstracts.TClass;
import fuzztest.utils.storage.TArrayList;

/**
 * expression1 expression2 ...
 * 
 * 
 * Corresponding PEGjs rule:
 * 
 * <pre>
 * SequenceExpression
 *     = head:LabeledExpression tail:(__ LabeledExpression)* 
 *     {
 *         var _i;
 *         var _elements;
 *         var ret;
 *         
 *         if (tail.length > 0)
 *         {
 *             _elements      = [];
 *             _elements [0]   = head;
 *             for (i = 0; i < tail.length; i++)
 *             {
 *                 _elements [i+1] = tail [i][1];
 *             }
 * 
 *             ret = 
 *             {
 *                 type:           "sequence",
 *                 elements:       _elements,
 *                 location:       location ()
 *             };
 *         }
 *         else
 *         {
 *             ret = head;
 *         }
 *         
 *         return ret;
 *     }
 * </pre>
 * 
 * @author peter
 */
public class TSequence extends VNodeProcessor
{
    /**
     * The {@link TClass} of this class for type information. 
     */
    public  static final TClass gkClass = (new TSequence (TAttributeSet.GetNullSet ())).GetClass ();
    
    private TArrayList<VNode>        fElements;
    
    public TSequence (TAttributeSet attributes)
    {
        super (attributes);
        fElements = new TArrayList<> ();
    }
    
    public void Add (VNode element)
    {
        fElements.Add (element);
    }

    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (String head)
    {
        int     i;
        int     n;
        VNode   e;
        String  ret;
        
        ret = head;
        n   = fElements.GetNumElements ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                e   = fElements.Get (i);
                ret = ret + e.CreateData ("");
            }
        }
        
        return ret;
    }
}
