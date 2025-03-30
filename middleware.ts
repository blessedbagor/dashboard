export {auth as middleware} from '@/auth';

export const config = {
    unstable_allowDynamic: [
      // allows a single file
      '/lib/utils.ts',
      // use a glob to allow anything in the function-bind 3rd party module
      '**/node_modules/function-bind/**',
    ],
  }