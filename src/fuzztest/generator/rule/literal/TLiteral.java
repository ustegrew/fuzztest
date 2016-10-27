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

import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;

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
public class TLiteral extends VNode
{
    private String          fLiteral;
    
    /**
     * 
     */
    public TLiteral (String literal)
    {
        super ();
        fLiteral = literal;
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (TStrategy s, String head)
    {
        boolean                 doFollow;
        TLiteral                lit;
        String                  ret;
        
        doFollow = VNode.DoesFollowRule (s);
        if (doFollow)
        {
            lit = this;
        }
        else
        {
            lit = (TLiteral) _GetFromOppositeSet ();
        }
        
        ret = head + lit.fLiteral;
        
        return ret;
    }

}
