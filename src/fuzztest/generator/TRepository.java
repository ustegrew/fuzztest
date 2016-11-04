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

package fuzztest.generator;

import fuzztest.model.abstracts.TClass;
import fuzztest.utils.storage.TArrayList;
import fuzztest.utils.storage.TArrayMap;

/**
 * The central repository holding references to all {@link VBrowseable} objects.
 * Implemented as global singleton, i.e. anyone can query the repository for stored
 * objects.
 * Each object is identified by key and by index. Indices are zero based and follow 
 * append order, i.e. the object appended first has index zero, next object has index one etc. 
 * 
 * @author peter
 */
public class TRepository
{
    private static TRepository              gRepository = null;
    
    /**
     * Adds an object to the repository. The object must have it's key property set prior to adding.
     * 
     * @param   b                           The object to be stored.
     * @return                              The stored object's key.
     * @throws  IllegalArgumentException    if the object's key isn't set or there's already another object
     *                                      stored with the same key.
     */
    public static String Add (VBrowseable b)
    {
        String ret;
        
        _CreateRepository ();
        ret = gRepository._Add (b);
        
        return ret;
    }
    
    /**
     * Returns the object with the given index.
     * 
     * @param   i   Index of the object requested.  
     * @return      Object being requested.
     * @throws  IllegalArgumentException if the index is out of range.
     */
    public static VBrowseable Get (int i)
    {
        VBrowseable ret;
        
        _CreateRepository ();
        ret = gRepository._GetElement (i);
        
        return ret;
    }
    
    /**
     * Returns the object with the given key.
     * 
     * @param   key     Key of the object requested.  
     * @return          Object being requested.
     * @throws  IllegalArgumentException if the key has an invalid value or 
     *                                   there isn't any object with that key.
     */
    public static VBrowseable Get (String key)
    {
        VBrowseable ret;
        
        _CreateRepository ();
        ret = gRepository._GetElement (key);
        
        return ret;
    }
    
    /**
     * Returns a list of keys of objects that are of the same class as the given {@link VBrowseable}.
     * 
     * @param   b   The {@link VBrowseable} whose class we are querying.
     * @return      A list of keys of objects that are of the given class.
     */
    public static TArrayList<String> GetKeys (TClass c)
    {
        TArrayList<String>       ret;
        
        _CreateRepository ();
        ret = gRepository._GetKeys (c, true);
        
        return ret;
    }
    
    /**
     * Returns a list of keys of objects that are of the same or parent class as the given {@link VBrowseable}.
     * 
     * @param   b           The {@link VBrowseable} whose class we are querying.
     * @param   isStrict    If <code>true</code>, we filter for objects that have <i>exactly</i>
     *                      the same class as the given {@link VBrowseable}. If <code>false</code>,
     *                      we also accept objects of a class that is in the given object's parent 
     *                      chain.
     * @return              A list of keys of objects that are of the given class, or a parent class thereof.
     */
    public static TArrayList<String> GetKeys (TClass c, boolean isStrict)
    {
        TArrayList<String>       ret;
        
        _CreateRepository ();
        ret = gRepository._GetKeys (c, isStrict);
        
        return ret;
    }
    
    /**
     * @return  The number of objects stored in the repository.
     */
    public static int GetNumElements ()
    {
        int ret;
        
        _CreateRepository ();
        ret = gRepository._GetNumElements ();
        
        return ret;
    }
    
    /**
     * Returns <code>true</code> if there is an object with the given key, <code>false</code> otherwise.
     * 
     * @param   key     The key being queried
     * @return          <code>true</code> if there is an object with the given 
     *                  key, <code>false</code> otherwise.
     */
    public static boolean HasElement (String key)
    {
        boolean ret;
        
        _CreateRepository ();
        ret = gRepository._HasElement (key);
        
        return ret;
    }
    /**
     * Creates a new repository (singleton) if none existed before. 
     */
    private static void _CreateRepository ()
    {
        if (gRepository == null)
        {
            gRepository = new TRepository ();
        }
    }
    
    private TArrayMap<VBrowseable>          fRepository;

    private TRepository ()
    {
        fRepository             = new TArrayMap<> ();
    }
    
    private String _Add (VBrowseable b)
    {
        String      key;
        
        key = b.GetKey ();
        fRepository.Add (key, b);

        return key;
    }
    
    private VBrowseable _GetElement (int i)
    {
        VBrowseable ret;
        
        ret = fRepository.Get (i);
        
        return ret;
    }
    
    private VBrowseable _GetElement (String key)
    {
        VBrowseable ret;
        
        ret = fRepository.Get (key);
        
        return ret;
    }
    
    private TArrayList<String> _GetKeys (TClass c, boolean isStrict)
    {
        int                         i;
        int                         n;
        VBrowseable                 b0;
        TClass                      c0;
        boolean                     isClass;
        String                      key;
        TArrayList<String>          ret;
        
        ret = new TArrayList<> ();
        n   = fRepository.GetNumElements ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                b0      = fRepository.Get (i);
                c0      = b0.GetClass ();
                isClass = isStrict  ?  
                              c.IsEqualTo (c0) 
                          :
                              c.IsEqualToOrDerivedFrom (c0);
                if (isClass)
                {
                    key = b0.GetKey ();
                    ret.Add (key);
                }
            }
        }
        
        return ret;
    }
    
    private int _GetNumElements ()
    {
        int ret;
        
        ret = fRepository.GetNumElements ();
        
        return ret;
    }
    
    private boolean _HasElement (String key)
    {
        boolean ret;
        
        ret = fRepository.HasElement (key);
        
        return ret;
    }
}

/*
[100]   Double cast
        - This program will be transpiled to Javascript and run as such. 
        - We need Javascript access to the object so we can query type compatibility.
        - Original code of this program is developed inside a Java environment and has to
          be compileable by Java. hence the double cast.
          
        JSweet will transpile the double cast to a simple assignment:
            obj = (jsweet.lang.Object) ( (java.lang.Object) fObjectsList.Get (i))   =>
            obj = fObjectsList.Get (i);
*/