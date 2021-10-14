import React from 'react';
import { render, screen,fireEvent} from '@testing-library/react';
import SpidSelect from '../SpidSelect';

test('renders learn react link Informativa sulla Privacy', () => {
    render(<SpidSelect onBack={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    const LinkName = screen.getByRole(/Button/i,{name :'Infocert ID'});
    screen.debug(LinkName);
 

});