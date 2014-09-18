#
# Copyright (c) 2014
#   Dario Brandes
#   Thies Johannsen
#   Paul Kröger
#   Sergej Mann
#   Roman Naumann
#   Sebastian Thobe
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification,
# are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice, this
#    list of conditions and the following disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice,
#    this list of conditions and the following disclaimer in the documentation
#    and/or other materials provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
# ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
# ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

#  -*-  indent-tabs-mode: nil; c-basic-offset: 4; tab-width: 4 -*-

# contact status:
#  BLOCKED:   0
#  OPEN:      1
#  PENDING:   2
#  SUCCESS:   3
#  FOLLOWING: 4

SecSocNet.ContactsEditController = Ember.ObjectController.extend
  actions:
    deleteContact: ->
      contact = @get('model')
      contact.deleteRecord()
      contact.save();
    blockContact: ->
      contact = @get('model')
      contact.set('status',0)
      contact.save();
    unblockContact: ->
      contact = @get('model')
      contact.set('status',2)
      contact.save();
    acceptContact: ->
      contact = @get('model')
      contact.set('status',3)
      contact.save()
      @trigger(contact.id)
    followContact: ->
      contact = @get('model')
      contact.set('status',4)
      contact.save();
    updateAlias: ->
      contact = @get('model')
      contact.save().then( (->),-> contact.reload())
  trigger: (contact_id) ->
    user  = Ember.$.cookie('auth_user')
    token = Ember.$.cookie('auth_token')
    xhr = new XMLHttpRequest()
    xhr.open("post", "/trigger", true);
    xhr.setRequestHeader('Auth-User', user)
    xhr.setRequestHeader('Auth-Token', token)
    formData = new FormData();
    formData.append('contactId', contact_id)
    xhr.send(formData);
