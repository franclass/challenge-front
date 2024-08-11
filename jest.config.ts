

const config ={
  preset: 'ts-jest',
  testEnvironment: 'jsdom', 
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    '\\.(css|less|sass|scss)$': '<rootDir>/src/mocks/styleMock.js',
    '\\.(woff|woff2|eot|ttf|otf)$': '<rootDir>/src/mocks/styleMock.js',
    "^@providers/(.*)$": "<rootDir>/src/providers/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/common/interfaces/$1",
    "^@fontsource/(.*)$": "<rootDir>/src/mocks/fontMock.js", 
  },
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    "^.+\\.svg$": "<rootDir>/svgTransform.js"
  }
};


export default config;  