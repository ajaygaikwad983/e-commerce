import { PluginOption } from 'vite';

export const injectMeticulousRecordingScript: PluginOption = {
  name: 'html-transform',
  transformIndexHtml(html) {
    return html.replace(
      /<script\s+id="meticulous"[\s\S]*?<\/script>/,
      `<script
          id='meticulous'
          data-recording-token='BW9IztvxcslKznf7QzfSIRlH1wT6CwJ5U7NXP2C2'
          data-is-production-environment='false'
          src='https://snippet.meticulous.ai/v1/meticulous.js'
        ></script>`
    );
  }
};