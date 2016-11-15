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

package fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01;

import static jsweet.dom.Globals.console;

import fuzztest.generator.TRepository;
import fuzztest.generator.rule._common.ERuleAdhesion;
import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.model.abstracts.TClass;
import fuzztest.utils.storage.TArrayList;

/**
 * @author peter
 * 
 * Output:
 * 
 * 2016-11-15 08:07:38.358 bundle.js:2251 =========================================================
 * 2016-11-15 08:07:38.358 bundle.js:2252 TDevQueryObject_01
 * 2016-11-15 08:07:38.358 bundle.js:2253 =========================================================
 * 2016-11-15 08:07:38.359 bundle.js:2264 keys-VNode
 * 2016-11-15 08:07:38.359 bundle.js:2265 ---
 * 2016-11-15 08:07:38.361 bundle.js:2270 Node_01
 * 2016-11-15 08:07:38.361 bundle.js:2270 Node_02
 * 2016-11-15 08:07:38.361 bundle.js:2255 ---------------------------------------------------------
 * 2016-11-15 08:07:38.362 bundle.js:2264 keys-VNodeType01
 * 2016-11-15 08:07:38.362 bundle.js:2265 ---
 * 2016-11-15 08:07:38.362 bundle.js:2270 Node_01
 * 2016-11-15 08:07:38.363 bundle.js:2257 ---------------------------------------------------------
 * 2016-11-15 08:07:38.363 bundle.js:2264 keys-VNodeType02
 * 2016-11-15 08:07:38.363 bundle.js:2265 ---
 * 2016-11-15 08:07:38.364 bundle.js:2270 Node_02
 */
public class TDevQueryObject_01
{
    public static void Query ()
    {
        VNodeType01             n1;
        VNodeType02             n2;
        TClass                  nc0;
        TClass                  nc1;
        TClass                  nc2;
        TArrayList<String>      keys0;
        TArrayList<String>      keys1;
        TArrayList<String>      keys2;
        
        TRepository.Clear ();
        
        n1      = new VNodeType01 ();
        n2      = new VNodeType02 ();
        nc0     = VNode.gkClass;
        nc1     = n1.GetClass ();
        nc2     = n2.GetClass ();
        
        keys0   = TRepository.GetKeys (nc0, false);
        keys1   = TRepository.GetKeys (nc1);
        keys2   = TRepository.GetKeys (nc2);

        console.log ();
        console.log ("=========================================================");
        console.log ("TDevQueryObject_01");
        console.log ("=========================================================");
        DumpKeys ("keys-VNode",         keys0);
        console.log ("---------------------------------------------------------");
        DumpKeys ("keys-VNodeType01",   keys1);
        console.log ("---------------------------------------------------------");
        DumpKeys ("keys-VNodeType02",   keys2);
    }
    private static class VNodeType01 extends VNode 
    {
        protected VNodeType01 () {super (new TAttributeSet ("Node_01", 1, ERuleAdhesion.kFollowRule, 10, false));}
        protected String _CreateData (String head){return null;}
    }
    
    private static class VNodeType02 extends VNode 
    {
        protected VNodeType02 (){super (new TAttributeSet ("Node_02", 1, ERuleAdhesion.kFollowRule, 10, false));}
        protected String _CreateData (String head){return null;}
    }
    
    private static void DumpKeys (String header, TArrayList<String> keys)
    {
        int         i;
        int         n;
        String      k;
        
        console.log (header);
        console.log ("---");
        n = keys.GetNumElements ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                k = keys.Get (i);
                console.log (k);
            }
        }
        else
        {
            console.log ("found 0 (zero) keys.");
        }
    }
}
