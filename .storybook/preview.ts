import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import '../src/index.css';

const ThemeDecorator = (Story: any, context: any) => {
  const theme = context.globals.theme || 'light';
  const viewMode = context.viewMode || 'story'; // 'story' for Canvas, 'docs' for Docs
  
  // Apply theme class to document root for Tailwind CSS
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Clear existing theme classes
    root.classList.remove('dark', 'light');
    body.classList.remove('dark', 'light');
    
    // Apply new theme
    root.classList.add(theme);
    body.classList.add(theme);
    
    // Set Storybook body background based on theme
    if (theme === 'dark') {
      body.style.backgroundColor = '#0f172a';
      body.style.color = '#f1f5f9';
    } else {
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#0f172a';
    }
    
    // Apply to storybook containers
    const storybookRoot = document.getElementById('storybook-root');
    if (storybookRoot) {
      storybookRoot.className = theme;
      if (theme === 'dark') {
        storybookRoot.style.backgroundColor = '#0f172a';
        storybookRoot.style.color = '#f1f5f9';
      } else {
        storybookRoot.style.backgroundColor = '#ffffff';
        storybookRoot.style.color = '#0f172a';
      }
    }
    
    // Apply theme to main Storybook containers
    const sbShowMain = document.querySelector('.sb-show-main');
    if (sbShowMain) {
      sbShowMain.setAttribute('data-view-mode', viewMode);
      sbShowMain.setAttribute('data-theme', theme);
      sbShowMain.setAttribute('data-layout', context.parameters?.layout || 'centered');
      
      // Apply theme styles to main container
      const mainElement = sbShowMain as HTMLElement;
      if (theme === 'dark') {
        mainElement.style.backgroundColor = '#0f172a';
        mainElement.style.color = '#f1f5f9';
      } else {
        mainElement.style.backgroundColor = '#ffffff';
        mainElement.style.color = '#0f172a';
      }
    }
    
    // Apply theme to story containers
    const storyElements = document.querySelectorAll('.sb-story, .docs-story');
    storyElements.forEach((element) => {
      const storyElement = element as HTMLElement;
      if (theme === 'dark') {
        storyElement.style.backgroundColor = '#0f172a';
        storyElement.style.color = '#f1f5f9';
      } else {
        storyElement.style.backgroundColor = '#ffffff';
        storyElement.style.color = '#0f172a';
      }
    });
    
  }, [theme, viewMode]);
  
  // Create a theme-aware wrapper for the story
  const containerStyle = {
    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
    color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    padding: viewMode === 'docs' ? '1rem' : '2rem',
    borderRadius: '8px',
    minHeight: '100px',
    width: '100%',
    display: 'block',
  };
  
  // For full-screen layouts (like pages), ensure proper container setup
  if (context.parameters?.layout === 'fullscreen') {
    const fullscreenStyle = {
      backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      transition: 'background-color 0.2s ease, color 0.2s ease',
      padding: '0',
      margin: '0',
      minHeight: viewMode === 'docs' ? 'auto' : 'auto',
      width: viewMode === 'docs' ? '100%' : 'auto',
      maxWidth: viewMode === 'story' ? '1200px' : '100%',
      display: 'block',
      boxSizing: 'border-box',
    };

    return React.createElement(
      'div',
      {
        className: `${theme} transition-colors duration-200`,
        style: fullscreenStyle
      },
      React.createElement(Story)
    );
  }
  
  // For docs view, use full-width container with no padding/margins
  if (viewMode === 'docs') {
    return React.createElement(
      'div',
      {
        className: `${theme} transition-colors duration-200`,
        style: {
          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
          color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          transition: 'background-color 0.2s ease, color 0.2s ease',
          padding: '0',
          margin: '0',
          borderRadius: '0',
          minHeight: '100px',
          width: '100%',
          display: 'block',
          boxSizing: 'border-box',
        }
      },
      React.createElement(Story)
    );
  }
  
  // For canvas view, use full container
  return React.createElement(
    'div',
    {
      className: `${theme} transition-colors duration-200`,
      style: containerStyle
    },
    React.createElement(Story)
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Disable default backgrounds since we handle theming
    },
    docs: {
      story: {
        inline: true,
      },
    },
    layout: 'centered',
  },
  decorators: [ThemeDecorator],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
