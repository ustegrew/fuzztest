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
        _Init ();
    }
    
    /**
     * Clears this hashmap. Note that the actual objects won't be deleted, 
     * instead we simply set this hash map's elements to <code>null</code>.
     * This means that it's not guaranteed that stored objects will be deleted
     * (e.g. by the garbage collector). Clients should keep access to the
     * stored level as local as possible, e.g. by assigning stored elements to 
     * local variables in a function which frees them when function is out of scope. 
     */
    public void Clear ()
    {
        _Init ();
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

    private void _Init ()
    {
        String[]        keys;
        int             i;
        int             n;
        String          k;
        
        /* [100] */
        keys = jsweet.lang.Object.keys (fElements);
        n    = keys.length;
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                k = keys [i];
                fElements.$set (k, null);
            }
        }
        fNumElements = 0;
    }
}

/*
[100]   Another way of clearing an object is to explicitly delete the elements 
        in the fElements object (Javascript has the keyword 'delete' reserved
        for that purpose). However, I don't want to destroy references to objects
        that could be in use someplace else in the program. Therefore I simply set all 
        the hashmap's elements to null. The garbage collector will take care 
        of the unused Objects formerly referenced by the hash map.
*/