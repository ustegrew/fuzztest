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

package fuzztest.generator.rule;

import fuzztest.generator.primitive.TOnceAssignable;

/**
 * @author peter
 *
 */
public class VNodeFallthrough extends VNode
{
    private TOnceAssignable<VNode>      fExpression;
    
    /**
     * 
     */
    public VNodeFallthrough ()
    {
        super ();
        fExpression = new TOnceAssignable<> ();
    }
    
    public VNodeFallthrough (String key)
    {
        super (key);
    }
    
    public void SetExpression (VNode e)
    {
        fExpression.Set (e);
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    public String CreateData (TStrategy s, String head)
    {
        VNode       e;
        String      ret;
        
        e   = fExpression.Get ();
        ret = e.CreateData (s, head);
        
        return ret;
    }
}
