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

/**
 * @author peter
 *
 */
public abstract class VNodeActive extends VNode
{
    public VNodeActive ()
    {
        super ();
    }
    
    public VNodeActive (String key)
    {
        super (key);
    }
    
    /**
     * Creates a data fragment and appends it to the given head string. 
     * 
     * This method guards against descend going too deep
     * (recursion limit).
     * 
     * Please call this method from all sub classes as it provides 
     * the recursion limit. 
     * 
     * @param       s       The fragment creation strategy.
     * @param       head    The head unto which we append the newly 
     *                      created fragment.
     * @return      The newly assembled source code fragment.
     */
    public String CreateData (TStrategy s, String head)
    {
        boolean canEnter;
        String  ret;
        
        s.OnNodeEnter ();
        canEnter = s.CanEnter ();
        if (canEnter)
        {
            ret = _CreateData (s, head);
        }
        else
        {
            ret = head;
        }
        s.OnNodeExit ();
        
        return ret;
    }
    
    /**
     * Creates a data fragment from the concrete grammar artifact and 
     * appends it to the given head string.
     * 
     * Concrete implementations of this class should not call this 
     * method directly, but should call {@link #CreateData(TStrategy, String)}.
     * 
     * @param       s       The fragment creation strategy.
     * @return              The data fragment for a particular test case.
     */
    protected abstract String _CreateData (TStrategy s, String head);
}
