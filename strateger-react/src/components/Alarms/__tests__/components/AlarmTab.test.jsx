import { render, screen, fireEvent } from '@testing-library/react';
import AlarmTab from '../../../Alarms/components/AlarmTab';
import { Tab } from '@headlessui/react';

describe('AlarmTab - Initial Rendering', () => {
  test('Should render with the correct tab name', () => {
    render(
      <Tab.Group>
        <Tab.List>
          <AlarmTab tabName="Test Tab" disabled={false} onClick={jest.fn()} />
        </Tab.List>
      </Tab.Group>
    );

    expect(screen.getByText('Test Tab')).toBeInTheDocument();
  });
});

describe('AlarmTab - Interactive States', () => {
  test('Should apply the correct class when selected', () => {
    render(
      <Tab.Group>
        <Tab.List>
          <AlarmTab tabName="Selected Tab" disabled={false} onClick={jest.fn()} />
          <AlarmTab tabName="Other Tab" disabled={false} onClick={jest.fn()} />
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Selected Tab Content</Tab.Panel>
          <Tab.Panel>Other Tab Content</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    );

    const tab = screen.getByText('Selected Tab');
    fireEvent.click(tab); // Simulates selection
    expect(tab).toHaveClass('bg-african_violet-500');
  });

  test('Should respond to clicks', () => {
    const handleClick = jest.fn();
    render(
      <Tab.Group>
        <Tab.List>
          <AlarmTab tabName="Clickable Tab" disabled={false} onClick={handleClick} />
        </Tab.List>
      </Tab.Group>
    );

    fireEvent.click(screen.getByText('Clickable Tab'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('AlarmTab - Disabled States', () => {
  test('Should be disabled if the prop disabled is true', () => {
    render(
      <Tab.Group>
        <Tab.List>
          <AlarmTab tabName="Disabled Tab" disabled={true} onClick={jest.fn()} />
        </Tab.List>
      </Tab.Group>
    );

    const tab = screen.getByText('Disabled Tab');
    expect(tab).toHaveClass('opacity-50 cursor-not-allowed pointer-events-none');
    expect(tab).toHaveAttribute('aria-disabled', 'true');
  });

  test('Should not respond to clicks if disabled', () => {
    const handleClick = jest.fn();
    render(
      <Tab.Group>
        <Tab.List>
          <AlarmTab tabName="Disabled Tab" disabled={true} onClick={handleClick} />
        </Tab.List>
      </Tab.Group>
    );

    fireEvent.click(screen.getByText('Disabled Tab'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
