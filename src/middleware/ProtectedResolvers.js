const ProtectedResolvers = [
  {
    name: 'adminCreateUser',
    allowedMiddleware: [
      'auth',
      'role'
    ],
    allowedRoles: [
      'Admin'
    ]
  },
  {
    name: 'createRole',
    allowedMiddleware: [
      'auth',
      'role'
    ],
    allowedRoles: [
      'Admin'
    ]
  }
];

export default ProtectedResolvers;
