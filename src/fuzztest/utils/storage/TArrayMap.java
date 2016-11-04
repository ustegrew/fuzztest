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
public class TArrayMap<T>
{
    private THashMap<T>                 fHashMap;
    private TArrayList<T>               fArrayList;
    
    public TArrayMap ()
    {
        fHashMap        = new THashMap<> ();
        fArrayList      = new TArrayList<> ();
    }
 
    public void Add (String key, T obj)
    {
        fHashMap.Set (key, obj);
        fArrayList.Add (obj);
    }
    
    public T Get (String key)
    {
        T ret;
        
        ret = fHashMap.Get (key);
        
        return ret;
    }
    
    public T Get (int i)
    {
        T ret;
        
        ret = fArrayList.Get (i);
        
        return ret;
    }
    
    public int GetNumElements ()
    {
        int ret;
        
        ret = fArrayList.GetNumElements ();
        
        return ret;
    }
    
    public boolean HasElement (String key)
    {
        boolean ret;
        
        ret = fHashMap.HasElement (key);
        
        return ret;
    }
}
