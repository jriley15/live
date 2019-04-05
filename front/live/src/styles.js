import { create } from 'jss';
import preset from 'jss-preset-default';

import { createGenerateClassName } from '@material-ui/core/styles';

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export default jss;