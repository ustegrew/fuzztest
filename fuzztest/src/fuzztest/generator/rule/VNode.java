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

import java.util.ArrayList;

import fuzztest.generator.TRepository;
import fuzztest.generator.VBrowseable;
import fuzztest.generator.rule.TStrategy.ERuleAdhesion;
import fuzztest.generator.rule.choice.TChoice;
import fuzztest.utils.gen.TGenData;

/**
 * @author peter
 *
 */
public abstract class VNode extends VBrowseable
{
    public VNode ()
    {
        _Register ();
    }
    
    public VNode (String key)
    {
        _Register (key);
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
    public abstract String CreateData (TStrategy s, String head);

    /**
     * Returns either this node or a randomly chosen node different from 
     * this one, but of the same (concrete) class (i.e. another object of this class). 
     * For example, if this node is a {@linkplain TChoice}, then the chosen 
     * node will be a distinctly other {@linkplain TChoice} object.
     * Object will be retrieved from the {@link TRepository}. 
     * 
     * The returned node will be used to randomly mix generation rules 
     * of the same kind.   
     * 
     * @param       s       The generating strategy. If it's  
     *                      {@link TStrategy#GetRuleAdhesion()} method
     *                      returns {@link ERuleAdhesion#kFollowRule} then
     *                      we will return this node. If the method 
     *                      returns {@link ERuleAdhesion#kInjectInvalids} then
     *                      we will return a randomly chosen different node.
     * @return              Concrete node of this class, either this one or 
     *                      distinctly different from this node.      
     */
    protected VNode _GetFromOppositeSet (TStrategy s)
    {
        Class<? extends VNode>          c;
        int                             i;
        int                             n;
        String                          kThis;
        String                          kOther;
        boolean                         hasKey;
        boolean                         isEqual;
        ArrayList<String>               refs;
        VNode                           ret;
        
        kThis   = GetKey ();
        c       = this.getClass ();
        refs    = TRepository.GetKeys (c);
        n       = refs.size ();
        ret     = null;
        if (n >= 1)
        {
            hasKey = false;
            do
            {
                i       = TGenData.GetInt (n);
                kOther  = refs.get (i);
                isEqual = kThis.equals (kOther);
                hasKey  = ! isEqual;
            } while (! hasKey);
            
            ret = (VNode) TRepository.Get (kOther);
        }
        else
        {
            ret = (VNode) TRepository.Get (kThis);
        }
        
        return ret;
    }
}
