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

package fuzztest.generator.rule.literal;

import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.generator.rule._common.VNodeProcessor;
import fuzztest.model.abstracts.TClass;
import fuzztest.utils.storage.TOnceAssignable;

/**
 * 
 * 
 * Corresponding PEGjs rule:
 * 
 * <pre>
 * LiteralMatcher "literal"
 *     = value:StringLiteral ignoreCase:"i"? 
 *     {
 *         return 
 *         {
 *             type:               "literal",
 *             value:              value,
 *             ignoreCase:         ignoreCase !== null,
 *             location:           location()
 *         };
 *     }
 * </pre>
 * 
 * @author peter
 *
 */
public class TLiteral extends VNodeProcessor
{
    /**
     * The {@link TClass} of this class for type information. 
     */
    public  static final TClass gkClass = (new TLiteral (TAttributeSet.GetNullSet ())).GetClass ();

    private TOnceAssignable<String>     fLiteral;
    
    /**
     * 
     */
    public TLiteral (TAttributeSet attributes)
    {
        super (attributes);
        fLiteral = new TOnceAssignable<> ();
    }
    
    public void SetLiteral (String literal)
    {
        fLiteral.Set (literal);
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (String head)
    {
        TAttributeSet           as;
        boolean                 doFollow;
        TLiteral                lit;
        String                  ret;
        
        as       = _GetAttributes ();
        doFollow = VNode.DoesFollowRule (as);
        if (doFollow)
        {
            lit = this;
        }
        else
        {
            lit = (TLiteral) _GetFromOppositeSet ();
        }
        
        ret = head + lit.fLiteral.Get ();
        
        return ret;
    }
}
