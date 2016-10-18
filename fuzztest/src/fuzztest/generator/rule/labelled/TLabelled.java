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

import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;

/**
 * label: expression
 * 
 * @author peter
 */
public class TLabelled extends VNode
{
    private VNode                   fExpression;
    private String                  fLabel;
    
    public TLabelled ()
    {
        super ();
        fLabel          = null;
        fExpression     = null;
    }
    
    public String GetLabel ()
    {
        return fLabel;
    }
    
    public void SetExpression (VNode exprN)
    {
        if (fExpression != null)
        {
            throw new IllegalArgumentException ("Expression already set: Node set: '" + fExpression.GetKey () + "'. Tried to replace with: '" + exprN.GetKey () + "'");
        }
        
        fExpression = exprN;
    }
    
    public void SetLabel (String label)
    {
        if (fLabel != null)
        {
            throw new IllegalArgumentException ("Label already set: Current: '" + fLabel + "'. Tried to replace with: '" + label + "'");
        }
        fLabel = label;
    }

    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (TStrategy s, String head)
    {
        String      ret;
        
        ret = fExpression.CreateData (s, head);
        
        return ret;
    }
}
