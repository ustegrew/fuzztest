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

package fuzztest.generator.rule.choice;

import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.generator.rule._common.VNodeProcessor;
import fuzztest.model.abstracts.TClass;
import fuzztest.utils.gen.TGenData;
import fuzztest.utils.storage.TArrayList;

/**
 * 
 * 
 * Corresponding PEGjs rule:
 * 
 * <pre>
 * ChoiceExpression
 *     = head:ActionExpression tail:(__ "/" __ ActionExpression)*
 *     {
 *         var _alternatives;
 *         var _i;
 *         var ret;
 *         
 *         if (tail.length > 0)
 *         {
 *             _alternatives      = [];
 *             _alternatives [0]  = head;
 *             for (i = 0; i < tail.length; i++)
 *             {
 *                 _alternatives [i+1] = tail [i][3];
 *             }
 * 
 *             ret =
 *             {
 *                 type:           "choice",
 *                 alternatives:   _alternatives,
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
 *
 */
public class TChoice extends VNodeProcessor
{
    /**
     * The {@link TClass} of this class for type information. 
     */
    public  static final TClass gkClass = (new TChoice (TAttributeSet.GetNullSet ())).GetClass ();

    private TArrayList<VNode>        fBranches;
    
    /**
     * 
     */
    public TChoice (TAttributeSet attributes)
    {
        super (attributes);
        fBranches = new TArrayList<> ();
    }
    
    public void AddExpression (VNode node)
    {
        fBranches.Add (node);
    }

    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (String head)
    {
        int     i;
        int     n;
        VNode   node;
        String  ret;
        
        n = fBranches.GetNumElements ();
        if (n >= 1)
        {
            i       = TGenData.GetIntUpTo (n);
            node    = fBranches.Get (i);
            ret     = node.CreateData (head); 
        }
        else
        {
            ret = head;
        }
        
        return ret;
    }
}

/*
[100]   We will ignore the ERuleAdhesion.kInjectInvalids directive - it will be honored by relevant sub nodes. 
*/