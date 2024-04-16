import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'Blog',

  projectId: 'hp5n6ih0',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],


})
