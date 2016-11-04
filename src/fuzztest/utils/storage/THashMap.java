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
 * A poor man's implementation of java.util.HashMap. I could try and import j4ts, but I got loads of
 * transpilation errors. I have a feeling that writing this impl is getting faster results than 
 * trying to make j4ts to work.
 * 
 * @author peter
 */
public class THashMap<T>
{
    private jsweet.lang.Object          fElements;
    private int                         fNumElements;
    
    public THashMap ()
    {
        fElements       = new jsweet.lang.Object ();
        fNumElements    = 0;
    }
    
    @SuppressWarnings ("unchecked")
    public T Get (String key)
    {
        T           ret;
        
        _AssertHasElement (key, false);
        ret = (T) fElements.$get (key);
        
        return ret;
    }
    
    public int GetNumElements ()
    {
        return fNumElements;
    }
    
    public boolean HasElement (String key)
    {
        boolean ret;
        
        ret = fElements.hasOwnProperty (key);
        
        return ret;
    }
    
    public void Set (String key, T obj)
    {
        _AssertHasElement (key, true);
        fElements.$set (key, obj);
        fNumElements++;
    }
    
    private void _AssertHasElement (String key, boolean doInverse)
    {
        boolean hasElement;
        
        hasElement = fElements.hasOwnProperty (key);
        if (doInverse)
        {
            if (hasElement)
            {
                throw new Error ("Duplicate key: '" + key + "'");
            }
        }
        else
        {
            if (! hasElement)
            {
                throw new Error ("Unknown key: '" + key + "'");
            }
        }
    }
}
