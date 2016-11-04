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

package fuzztest.utils.storage;

/**
 * @author peter
 *
 */
public class TOnceAssignable<T>
{
    private T               fElement;
    
    public TOnceAssignable ()
    {
        fElement = null;
    }
    
    public void Set (T element)
    {
        if (fElement != null)
        {
            throw new IllegalArgumentException ("Element can only be set once.");
        }
        fElement = element;
    }
    
    public T Get ()
    {
        if (fElement == null)
        {
            throw new IllegalStateException ("Cannot retrieve unset element.");
        }
        
        return fElement;
    }
}
