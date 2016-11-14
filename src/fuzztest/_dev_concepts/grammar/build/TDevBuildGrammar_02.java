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

package fuzztest._dev_concepts.grammar.build;

import static jsweet.dom.Globals.console;

import fuzztest.generator.TRepository;
import fuzztest.generator.rule._common.ERuleAdhesion;
import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.generator.rule.cClass.TCharacterClass;
import fuzztest.generator.rule.grammar.TGrammar;
import fuzztest.generator.rule.literal.TLiteral;
import fuzztest.generator.rule.rule.TRule;
import fuzztest.generator.rule.sequence.TSequence;

/**
 * @author peter
 * 
 * Output was:
 * 
 * =========================================================
 * TDevBuildGrammar_02
 * =========================================================
 * hello-==2
 * hello-world=c
 * hello-==a
 * hello-==3
 * hello-world=*
 * hello-worldworld7
 * hello-world=9
 * hello--world4
 * hello--world2
 * hello--=c
 * hello-worldhello*
 * hello--=5
 * hello-==*
 * hello-hello=*
 * hello-hello-d
 * hello-worldhello*
 * hello-worldworld9
 * hello-worldhello*
 * hello-world=*
 * hello-==e
 * hello-hellohello*
 * hello-world=4
 * hello-hello=9
 * hello-=helloc
 * hello-world=b
 * hello---*
 * hello-hello-*
 * hello-worldworldd
 * hello-=world0
 * hello-world=*
 * hello-world=8
 * hello-world=f
 * hello--hello*
 * hello-hello=7
 */
public class TDevBuildGrammar_02
{
    private static final int        kNumCases           = 1000;
    private static final int        kRecursionMax       = 5;
    private static final int        kNumRepeats         = 10;
    
    public static void TestBuild ()
    {
        TAttributeSet       str;
        TGrammar        g;
        TRule           r;
        TSequence       s;
        TCharacterClass c0;
        TLiteral        l0;
        TLiteral        l1;
        TLiteral        l2;
        TLiteral        l3;
        int             i;
        String          x;
        
        TRepository.Clear ();
        
        g  = new TGrammar (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule, kNumRepeats, false));
        r  = new TRule (new TAttributeSet ("start", kRecursionMax, ERuleAdhesion.kFollowRule, kNumRepeats, false));
        
        l0 = new TLiteral           (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule,     kNumRepeats, false));
        l0.SetLiteral ("hello");
        
        l1 = new TLiteral           (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule,     kNumRepeats, false));
        l1.SetLiteral ("-");
        
        l2 = new TLiteral           (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kInjectInvalids, kNumRepeats, false));
        l2.SetLiteral ("world");
        
        l3 = new TLiteral           (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kInjectInvalids, kNumRepeats, false));
        l3.SetLiteral ("=");
        
        c0 = new TCharacterClass    (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule,     kNumRepeats, false));
        c0.AddPoint ("*");
        c0.AddRange ("0", "9");
        c0.AddRange ("a", "f");
        
        s  = new TSequence          (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule,     kNumRepeats, false));
        s.Add (l0);
        s.Add (l1);
        s.Add (l2);
        s.Add (l3);
        s.Add (c0);
        
        r.SetExpression (s);
        g.SetExpression (r);
        
        console.log ();
        console.log ("=========================================================");
        console.log ("TDevBuildGrammar_02");
        console.log ("=========================================================");
        for (i = 0; i < kNumCases; i++)
        {
            VNode.ClearVisitCounters ();
            x = g.CreateData ("");
            console.log (x);
        }
    }
}
