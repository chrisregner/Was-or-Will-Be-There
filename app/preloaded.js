/**
 * Fixes issues with material-ui, material-ui-next, and material-ui-icons
 * https://github.com/mui-org/material-ui/issues/8458
 */
import SvgIcon from 'material-ui-next/SvgIcon'
global.__MUI_SvgIcon__ = SvgIcon
