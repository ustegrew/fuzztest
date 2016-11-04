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

import jsweet.lang.Array;
import jsweet.lang.Error;

/**
 * A poor man's implementation of java.util.ArrayList. I could try and import j4ts, but I got loads of
 * transpilation errors. I have a feeling that writing this impl is getting faster results than 
 * trying to make j4ts to work.
 * 
 * @author peter
 *
 */
public class TArrayList<T>
{
    private Array<T>            fElements;
    private int                 fNumElements;       /* [100] */
    
    public TArrayList ()
    {
        fElements       = new Array<> ();
        fNumElements    = 0;
    }
    
    @SuppressWarnings ("unchecked")
    public void Add (T obj)
    {
        fElements.push (obj);
        fNumElements++;
    }
    
    public T Get (int i)
    {
        T ret;
        
        _AssertIndexOK (i);
        ret = fElements.$get (i);
        
        return ret;
    }
    
    public int GetNumElements ()
    {
        return fNumElements;
    }
    
    private void _AssertIndexOK (int i)
    {
        if (i < 0  ||  i >= fNumElements)
        {
            throw new Error ("Index out of bounds. Must be in [0, " + fNumElements + "[. Given: " + i);
        }
    }
}

/*
[100] fElements.length yields a double value - 
      maybe ok after transpiling to JS, but still... 
      I'll use a simple counter instead.  
*/