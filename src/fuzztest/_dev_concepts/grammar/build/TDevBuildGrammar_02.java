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
import fuzztest.generator.rule.ERuleAdhesion;
import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;
import fuzztest.generator.rule.cClass.TCharacterClass;
import fuzztest.generator.rule.grammar.TGrammar;
import fuzztest.generator.rule.literal.TLiteral;
import fuzztest.generator.rule.rule.TRule;
import fuzztest.generator.rule.sequence.TSequence;

/**
 * @author peter
 *
 */
public class TDevBuildGrammar_02
{
    private static final int        kNumCases           = 10;
    private static final int        kRecursionMax       = 5;
    private static final int        kNumRepeats         = 10;
    
    public static void TestBuild ()
    {
        TStrategy       str;
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
        
        g  = new TGrammar           ();
        r  = new TRule              ("start");
        c0 = new TCharacterClass    ();
        c0.AddPoint                 ("*");
        c0.AddRange                 ("0", "9");
        c0.AddRange                 ("a", "f");
        l0 = new TLiteral           ("hello");
        l1 = new TLiteral           ("-");
        l2 = new TLiteral           ("world");
        l3 = new TLiteral           ("=");
        s  = new TSequence          ();
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
        str = new TStrategy (kRecursionMax, ERuleAdhesion.kFollowRule, kNumRepeats);
        for (i = 0; i < kNumCases; i++)
        {
            VNode.ClearVisitCounters ();
            x = g.CreateData (str, "");
            console.log (x);
        }
        
        console.log ("--------------------------------------------------");
        str = new TStrategy (kRecursionMax, ERuleAdhesion.kInjectInvalids, kNumRepeats);
        for (i = 0; i < kNumCases; i++)
        {
            VNode.ClearVisitCounters ();
            x = g.CreateData (str, "");
            console.log (x);
        }
        
        console.log ("--------------------------------------------------");
        str = new TStrategy (kRecursionMax, ERuleAdhesion.kFollowOpposite, kNumRepeats);
        for (i = 0; i < kNumCases; i++)
        {
            VNode.ClearVisitCounters ();
            x = g.CreateData (str, "");
            console.log (x);
        }
    }
}
