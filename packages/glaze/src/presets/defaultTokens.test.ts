import { expectAssignable } from 'tsd';

import { StaticTheme } from '../theme';
import { defaultTokens } from './defaultTokens';

expectAssignable<StaticTheme>(defaultTokens);
