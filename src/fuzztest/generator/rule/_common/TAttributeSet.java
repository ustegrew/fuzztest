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

import jsweet.lang.Error;
import jsweet.lang.RangeError;
import jsweet.lang.RegExp;

/**
 * @author peter
 *
 */
public class TAttributeSet
{
    public static TAttributeSet GetNullSet ()
    {
        TAttributeSet ret;
        
        ret = new TAttributeSet (null, 1, null, 0, true);
        
        return ret;
    }
    
    public static final int         kRecursionLimit     = 15;
    public static final int         kRepeatLimit        = 100;
    public static final RegExp      kReValidKey         = new RegExp ("^[a-zA-Z0-9_]+$");
    
    private boolean                 fDoNotRegister;
    private String                  fKey;
    private int                     fRecursionCounter;
    private int                     fRecursionMax;
    private int                     fRepeatMax;
    private ERuleAdhesion           fRuleAdhesion;
    
    public TAttributeSet 
    (
        String          key,
        int             recursionMax, 
        ERuleAdhesion   ruleAdhesion,
        int             repeatMax,
        boolean         doNotRegister
    )
    {
        _AssertParamsOK (key, recursionMax, ruleAdhesion, repeatMax);
        fKey                = key;
        fRecursionMax       = recursionMax;
        fRuleAdhesion       = ruleAdhesion;
        fRepeatMax          = repeatMax;
        fDoNotRegister      = doNotRegister;
    }
    
    /**
     * @return
     */
    public boolean CanEnter ()
    {
        boolean ret;
        
        ret = (fRecursionCounter <= fRecursionMax);
        
        return ret;
    }
    
    public boolean DoNotRegister ()
    {
        return fDoNotRegister;
    }
    
    public String GetKey ()
    {
        return fKey;
    }
    
    public int GetNumRepeatsMax ()
    {
        return fRepeatMax;
    }
    
    public int GetNumVisitsMax ()
    {
        return fRecursionMax;
    }
    
    public ERuleAdhesion GetRuleAdhesion ()
    {
        return fRuleAdhesion;
    }
    
    private void _AssertParamsOK
    (
        String          key,
        int             recursionMax, 
        ERuleAdhesion   ruleAdhesion,
        int             repeatMax
    )
    {
        if (! (kReValidKey.test (key)))
        {
            throw new Error ("Given key must match: '" + kReValidKey + "'. Given:" + key);
        }
        
        if (recursionMax <= 0  || recursionMax > kRecursionLimit)
        {
            throw new RangeError ("recursionMax out of range. Allowed: [1, " + kRecursionLimit + "], Given:" + recursionMax);
        }
        
        if (repeatMax < 0  ||  repeatMax > kRepeatLimit)
        {
            throw new RangeError ("repeatMax out of range. Allowed: [0, " + kRepeatLimit + "], Given: " + repeatMax);
        }
    }
}
