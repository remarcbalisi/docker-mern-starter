const ProtectedResolvers = [
  {
    name: 'createUser',
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
