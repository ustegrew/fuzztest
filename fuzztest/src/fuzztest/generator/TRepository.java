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

import java.util.ArrayList;
import java.util.HashMap;

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
     * Returns a list of keys of objects that are of the given class.
     * 
     * @param   c   The class of objects queried.
     * @return      A list of keys of objects that are of the given class.
     */
    public static ArrayList<String> GetKeys (Class<? extends VBrowseable> c)
    {
        ArrayList<String>       ret;
        
        _CreateRepository ();
        ret = gRepository._GetKeys (c);
        
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
    
    private static final String             kClassName  = TRepository.class.getCanonicalName ();
    private static TRepository              gRepository = null;
    
    private ArrayList<VBrowseable>          fObjectsList;
    private HashMap<String, VBrowseable>    fObjectsMap;
    
    private TRepository ()
    {
        fObjectsList    = new ArrayList<> ();
        fObjectsMap     = new HashMap<> ();
    }
    
    private String _Add (VBrowseable b)
    {
        String key;
        
        key = b.GetKey ();
        _AssertKeyOK (key, true);
        fObjectsList.add (b);
        fObjectsMap.put (key, b);
        
        return key;
    }
    
    private void _AssertKeyOK (String key, boolean isInverse)
    {
        boolean hasElement;
        
        if (key == null)
        {
            throw new IllegalArgumentException ("No null keys allowed");
        }
        
        hasElement = fObjectsMap.containsKey (key);
        if (isInverse)
        {
            if (hasElement)
            {
                throw new IllegalArgumentException ("Duplicate object: '" + key + "'");
            }
        }
        else
        {
            if (! hasElement)
            {
                throw new IllegalArgumentException ("No such object: '" + key + "'");
            }
        }
    }
    
    private void _AssertInRange (int i)
    {
        final String kMethod = "_AssertInRange";
        
        boolean hasErr;
        String  postamble;
        String  errMsg;
        int     n;
        
        hasErr      = false;
        n           = fObjectsList.size ();
        postamble   = "Index must be in [0, " + n + "[. Given: " + i;
        errMsg      = null;
        if (i < 0)
        {
            hasErr = true;
            errMsg = GetErrMsg ("Index too small. " + postamble, kMethod); 
        }
        else if (i >= n)
        {
            hasErr = true;
            errMsg = GetErrMsg ("Index too large. " + postamble, kMethod); 
        }
        
        if (hasErr)
        {
            throw new IndexOutOfBoundsException (errMsg);
        }
    }
    
    private VBrowseable _GetElement (int i)
    {
        VBrowseable ret;
        
        _AssertInRange (i);
        ret = fObjectsList.get (i);
        
        return ret;
    }
    
    private VBrowseable _GetElement (String key)
    {
        VBrowseable ret;
        
        _AssertKeyOK (key, false);
        ret = fObjectsMap.get (key);
        
        return ret;
    }
    
    private ArrayList<String> _GetKeys (Class<? extends VBrowseable> c)
    {
        int                             n;
        int                             i;
        VBrowseable                     obj;
        Class<? extends VBrowseable>    c0;
        boolean                         isClass;
        String                          key;
        ArrayList<String>               ret;
        
        ret = new ArrayList<> ();
        n   = fObjectsList.size ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                obj     = fObjectsList.get (i);
                c0      = obj.getClass ();
                isClass = c0.equals (c);
                if (isClass)
                {
                    key = obj.GetKey ();
                    ret.add (key);
                }
            }
        }
        
        return ret;
    }
    
    private int _GetNumElements ()
    {
        int ret;
        
        ret = fObjectsList.size ();
        
        return ret;
    }
    
    private boolean _HasElement (String key)
    {
        boolean ret;
        
        ret = fObjectsMap.containsKey (key);
        
        return ret;
    }
    
    private String GetErrMsg (String details, String method)
    {
        String ret;
        
        ret = kClassName + "::" + method + ": " + details;
        
        return ret;
    }
}
