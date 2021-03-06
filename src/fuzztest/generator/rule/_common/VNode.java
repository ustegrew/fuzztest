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

package fuzztest.generator.rule._common;

import fuzztest.generator.TRepository;
import fuzztest.generator.VBrowseable;
import fuzztest.generator.rule.choice.TChoice;
import fuzztest.model.abstracts.TClass;
import fuzztest.utils.gen.TGenData;
import fuzztest.utils.storage.TArrayList;
import fuzztest.utils.storage.TOnceAssignable;

/**
 * @author peter
 *
 */
public abstract class VNode extends VBrowseable
{
    /**
     * A dummy class to provide a concrete derivative from the hosting abstract class.
     * Purely needed so we have something to instantiate (TClass cTor needs an object). 
     */
    private static class VNodeT extends VNode 
    {
        public VNodeT ()                            {super (TAttributeSet.GetNullSet ());}
        protected String _CreateData (String head)  {return null;}
    }
    /**
     * The {@link TClass} of this class for type information. 
     */
    public  static final TClass gkClass = (new VNodeT ()).GetClass ().GetParent ();

    public static void ClearVisitCounters ()
    {
        int                 i;
        int                 n;
        String              k;
        VNode               nd;
        TClass              clVNode;
        TArrayList<String>  keys;
        
        clVNode = gkClass;
        keys    = TRepository.GetKeys (clVNode, false);
        n       = keys.GetNumElements ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                k   = keys.Get (i);
                nd  = (VNode) TRepository.Get (k);
                nd.ClearVisitCounter ();
            }
        }
    } 
    
    public static boolean DoesFollowRule (TAttributeSet s)
    {
        ERuleAdhesion       r;
        boolean             ret;
        
        r = s.GetRuleAdhesion ();
        if (r == ERuleAdhesion.kFollowRule)
        {
            ret = true;
        }
        else if (r == ERuleAdhesion.kFollowOpposite)
        {
            ret = false;
        }
        else
        {
            ret = TGenData.GetBoolean ();
        }
        
        return ret;
    }

    private TOnceAssignable<VNode>      fExpression;
    private int                         fNumVisits;
    private TAttributeSet               fAttributes;
    
    protected VNode (TAttributeSet attributes)
    {
        _Init (attributes);
    }
    
    public void ClearVisitCounter ()
    {
        fNumVisits = 0;
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
    public String CreateData (String head)
    {
        int     nVisitsMax;
        String  ret;
        
        nVisitsMax = fAttributes.GetNumVisitsMax ();
        if (fNumVisits <= nVisitsMax)
        {
            fNumVisits++;
            ret = _CreateData (head);
        }
        else
        {
            ret = head;
        }
        
        return ret;
    }
    
    public void SetExpression (VNode node)
    {
        fExpression.Set (node);
    }
    
    /**
     * Creates a data fragment from the concrete grammar artifact and 
     * appends it to the given head string.
     * 
     * This is a default method, meant to be overridden by nodes that generate 
     * their own data. Nodes that don't generate data won't need to override
     * this method.
     *  
     * Concrete implementations of this class should not call this 
     * method directly, but should call {@link #CreateData(TAttributeSet, String)}.
     * 
     * @param       s       The fragment creation strategy.
     * @return              The data fragment for a particular test case.
     */
    protected abstract String _CreateData (String head);
    
    protected VNode _GetExpression ()
    {
        VNode ret;
        
        ret = fExpression.Get ();
        
        return ret;
    }

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
     *                      {@link TAttributeSet#GetRuleAdhesion()} method
     *                      returns {@link ERuleAdhesion#kFollowRule} then
     *                      we will return this node. If the method 
     *                      returns {@link ERuleAdhesion#kInjectInvalids} then
     *                      we will return a randomly chosen different node.
     * @return              Concrete node of this class, either this one or 
     *                      distinctly different from this node.      
     */
    protected VNode _GetFromOppositeSet ()
    {
        TClass                          c;
        int                             i;
        int                             n;
        String                          kThis;
        String                          kOther;
        boolean                         hasKey;
        boolean                         isEqual;
        TArrayList<String>              refs;
        VNode                           ret;
        
        kThis   = GetKey ();
        c       = GetClass ();
        refs    = TRepository.GetKeys (c);
        n       = refs.GetNumElements ();
        ret     = null;
        if (n >= 2)     /* [100] */
        {
            hasKey = false;
            do
            {
                i       = TGenData.GetIntUpTo (n);
                kOther  = refs.Get (i);
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
    
    protected TAttributeSet _GetAttributes ()
    {
        return fAttributes;
    }

    private void _Init (TAttributeSet attributes)
    {
        boolean doNotRegister;
        String  key;
        
        fAttributes         = attributes;
        fNumVisits          = 0;
        fExpression         = new TOnceAssignable<> ();
        doNotRegister       = fAttributes.DoNotRegister ();
        key                 = fAttributes.GetKey ();
        if (! doNotRegister)
        {
            if (key == null)
            {
                _Register ();
            }
            else
            {
                _Register (key);
            }
        }
    }
}

/*
[100]   No point looking for another node of the same class if there's only one of these nodes
        e.g. if we only have one single TRule in the grammar, then there's no point looking for
        another one. Therefore: if (n >= 2), not: if (n>= 1)
*/
